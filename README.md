# BitSong Delegation DAO

## Prerequisites
* Basic information is set on chain: Contact information (website, twitter, telegram, etc.), details, avatar/logo.

## Rules
* Maximum commission is 10%.
* A validator must be live on mainnet for at least 1 month (active or inactive).
* Governance participation score of 90% or higher. **SCORE:** Validator voted / total proposals during validator in active set. 0/0 is considered as 100%.
* 1 soft slash is allowed during 1 epoch, when the 2nd soft slash happens the validator will lose their BitSong Delegation and can't submit for a delegation next epoch.
* When a validator suffers from a hard slash the validator will lose their BitSong Delegation and can't submit for a delegation for at least 6 month (duration decided by the BitSong Delegation DAO).
* The Delegation DAO reserves the right to completely exclude validators from the program if valid evidence of harmful behaviour is presented.

## Delegation criteria

* **Max 1000 points:** Uptime score (over period from last distribution epoch til now). **SCORE:** Less than 98% will result in 0 points otherwise (1 - (1 - Uptime / 100) / 0.02) * 1000 points.
* **Max 2000 points:** Participation in the BitSong ecosystem score (Social media, Telegram, Discord, but also writing documentation, guides, posts ect.). **SCORE:** decided by the BitSong Delegation DAO.
* **Max 3000 points:** Core development score. **SCORE:** decided by the BitSong Delegation DAO.
* **Max 2500 points:** None core development score. **SCORE:** decided by the BitSong Delegation DAO.
* **Max 2000 points:** Running relayers with a specific uptime score. **SCORE:** decided by the BitSong Delegation DAO.
* **Max 1500 points:** Running an archive node with a specific uptime score. **SCORE:** Less than 98% will result in 0 points otherwise (1 - (1 - Uptime / 100) / 0.02) * 1500 points.
* **Max 1000 points:** Running an public rpc/api with a specific uptime score. **SCORE:** Less than 98% will result in 0 points otherwise (1 - (1 - Uptime / 100) / 0.02) * 1000 points.
* **Max 1000 points:** Commission restake score (what percentage is the validator willing to self delegate off his gained commission during the epoch). **SCORE:** Percentage self staked * 1000 points.
* **Max 1000 points:** Self delegation score (what is the validators ratio between self stake and voting power). **SCORE:** Less than 0.5% will result in 0 points otherwise Self stake / Voting power * 1000 points.

**Total max: 15000 points.**

##### Additional info
* 98% uptime => ~7days downtime per year (https://uptime.is/98)
* When the Delegation DAO lacks the required knowledge and/or experience to evaluate and score a specific criteria it will consult an independent 3rd party to advise.
* Self delegation score can also include 1 external address that will be manually verified by the BitSong Delegation DAO.

## Points multiplier
A multiplier will be assigned to your delegation criteria score based on a validators current voting power **without the BitSong delegation**. The multiplier will range from 0.01x to 1x where the lowest validator will get a 1x multiplier and the number 1 validator receives a 0.01x multiplier.

| Rank | Multiplier |
|:----:|:----------:|
|  1   |   0.01x    |
| Rank | rank*0.01  |
| 100  |     1x     |

## Assigned delegation based on points
The total points (after applying the multipliers) of all participants represents the total BitSong delegation of a given epoch. All validators will get their BitSong delegation in ratio of their individual score vs the total score.

## Example
Validator A has an uptime of 99.5%. For this validator A will receive (1 - (1 - 99.5 / 100) / 0.02) * 1000 = 750 points. They did not participate in the BitSong ecosystem and also did not add any core development value. Validator A created a small faucet bot and it was decided to give it 1400 points for that from the None core development criteria. No relayers have been setup. Validator A does have a full archive node running, but they forgot to monitor it and it had an update of 98.1% since last epoch. For this validator A gains (1 - (1 - 98.1 / 100) / 0.02) * 1500 = 75 points. The full archive node was also rpc/api enabled for the public gaining another (1 - (1 - 98.1 / 100) / 0.02) * 1000 = 50 points. They also had a separate public rpc/api node available with an uptime of 99.9% which gained them (1 - (1 - 99.9 / 100) / 0.02) * 1000 = 950 points. Validator A is not self staking commission and does not meet the self delegation requirement.

**The total criteria score for validator A is 3225 points. Assuming they are ranked 50 without BitSong delegations and we apply the multiplier they will end up with 3225 * 0.5 = 1612.5 points**

Validator B has an uptime of 99.9%. For this validator B will receive (1 - (1 - 99.9 / 100) / 0.02) * 1000 = 950 points. Validator B was very active in public chats, social media (in regards to BitSong) and created some guides. For this Validator B gained 2000 points. No development was done, no relayers, no full archive nodes and no public rpc/api's have been setup. Validator B does self stake 90% of his commission. Herefor validator B gains an extra 90% * 1000 = 900 points. However the validator currently also does not meet the self delegation requirement.

**The total criteria score for validator B is 3850 points. Assuming they are ranked 55 without BitSong delegations and we apply the multiplier they will end up with 3850 * 0.55 = 2117.5 points.**

Validator C has an uptime of 99.9%. For this validator C will receive (1 - (1 - 99.9 / 100) / 0.02) * 1000 = 950 points. Validator C did not participate in the BitSong ecosystem. No development was done, no relayers, no full archive nodes and no public rpc/api's have been setup. Validator C does self stake 50% of his commission. Herefor validator C gains an extra 50% * 1000 = 500 points. Validator C also currently has a 50% self stake percentage and receives an extra 500 points.

**The total criteria score for validator C is has 1950 points. Assuming they are ranked 90 without BitSong delegations and we apply the multiplier they will end up with 1950 * 0.9 = 1755 points.**

Validator D has an uptime of 99.9%. For this validator D will receive (1 - (1 - 99.9 / 100) / 0.02) * 1000 = 950 points. Validator D was active in public BitSong chats and gained 500 points for this. Made a big value to the core development which was worth 2600 points. Also a basic explorer was made for 1500 points. Validator D is running 2 relayers with an uptime of 99.7% and 99%. For this validator D will receive (1 - (1 - 99.7 / 100) / 0.02) * 2000 = 1700 points and (1 - (1 - 99 / 100) / 0.02) * 2000 = 1000 points. No full archive node and public rpc/api has been setup. Validator D is self delegating 30% of his commission. Herefor validator D gains an extra 30% * 1000 = 300 points. However the validator currently also does not meet the self delegation requirement.

**The total criteria score for validator D is 8550 points. Assuming they are ranked 41 without BitSong delegations and we apply the multiplier they will end up with 8550 * 0.41 = 3591 points.**

If these were the only validators eligible for the BitSong delegation the total points of all validator add up to 1612.5 + 2117.5 + 1755 + 3591 = 9076 points representing the full BitSong delegation. No matter how big or small the BitSong delegation is the validators will receive the following portion of it:


| Validator | % of BitSong delegation |
|:---------:|:-----------------------:|
|     A     |         17.77%          |
|     B     |         23.33%          |
|     C     |         19.34%          |
|     D     |         39.56%          |

## How to join
Submit an issue in this repository using the Application template.

## Epoch distribution
* Every 3 months BitSong delegation is evaluated.

