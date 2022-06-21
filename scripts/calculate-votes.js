// How to use it:
// 0) install nodejs + npm
// 1) npm init --yes
// 2) npm i node-fetch@v2 bech32-buffer minimist
// 3) node calcualte-votes.js --rpc-node <rpc archive node without trailing slash> --lcd-node <lcd node without trailing slash>

const fetch = require('node-fetch');
const bech32 = require('bech32-buffer');
const minimist = require('minimist');

const args = minimist(process.argv.slice(2));

const rpcNode = getOrThrow(args, 'rpc-node'); // https://rpc-bitsong-archive.itastakers.com
const lcdNode = getOrThrow(args, 'lcd-node'); // https://api.bitsong.freak12techno.io

function getOrThrow(obj, propertyName) {
   if (obj.hasOwnProperty(propertyName)) {
       return obj[propertyName];
   }
   throw new Error("No key present: " + propertyName);
}

async function getProposalVotes(proposalId) {
    const limit = 100;
    let page = 1;

    const votersMap = {};

    while (true) {
        console.log('getting votes for proposal', proposalId, 'with page', page);
        const request = await fetch(`${rpcNode}/tx_search?query=%22proposal_vote.proposal_id=11%22&per_page=100&page=${page}`);
        const json = await request.json();

        const txs = json.result.txs;
        for (const tx of txs) {
            const events = JSON.parse(tx.tx_result.log);
            const firstEvent = events[0];
            const firstMessage = firstEvent.events[0];
            const voteAttr = firstMessage.attributes[2].value;

            votersMap[voteAttr] = 1;
        }
        
        if (txs.length < limit) {
            break;
        }

        page++;
    }

    return votersMap;
}

async function getValidators() {
    const limit = 100;
    let offset = 0;

    let validators = [];

    while (true) {
        console.log('getting validators with offset', offset);
        const request = await fetch(`${lcdNode}/cosmos/staking/v1beta1/validators?pagination.offset=${offset}&limit=${limit}`);
        const json = await request.json();
        validators = [...validators, ...json.validators];

        if (json.validators.length < limit) {
            break;
        }

        offset += limit;
    }

    return validators;
}

async function getProposals() {
    const limit = 100;
    let offset = 0;

    let proposals = [];

    while (true) {
        console.log('getting proposals with offset', offset);
        const request = await fetch(`${lcdNode}/cosmos/gov/v1beta1/proposals?pagination.offset=${offset}&limit=${limit}`);
        const json = await request.json();
        proposals = [...proposals, ...json.proposals];

        if (json.proposals.length < limit) {
            break;
        }

        offset += limit;
    }

    return proposals;
}

(async () => {
    const proposals = await getProposals();
    const validators = await getValidators();

    const proposalVotes = {};
    for (const proposal of proposals) {
        proposalVotes[proposal.proposal_id] = await getProposalVotes(proposal.proposal_id);
    }

    const result = {};

    for (const proposal of proposals) {
        const id = proposal.proposal_id;
        result[id] = {
            title: proposal.content.title,
            description: proposal.content.description,
            status: proposal.status,
            votes: [],
        }

        for (const validator of validators) {
            const wallet = bech32.encode('bitsong', bech32.decode(validator.operator_address).data);
            const voted = !!(proposalVotes[id][wallet]);
            const active = validator.status == 'BOND_STATUS_BONDED';

            result[id].votes.push({
                valoper: validator.operator_address,
                moniker: validator.description.moniker,
                wallet: wallet,
                active: active,
                voted: voted,
            });
        }
    }

    console.log(JSON.stringify(result));
})()
