import web3 from './web3Config.js';

const lottery_interface =[{"constant":false,"inputs":[],"name":"registerForLottery","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[],"name":"pickLotteryWinner","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"returnRegisteredMembers","outputs":[{"name":"","type":"address[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"shutDownLottery","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[],"name":"getAllWinningChances","outputs":[{"name":"","type":"address[]"},{"name":"","type":"int256[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"previousLotteryWinner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"memberList","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"managerAddress","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalWinningChance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getCurrentWinningChances","outputs":[{"name":"","type":"uint256"},{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"}];

const deployed_address = '0x68ab46B1C9d4907976E1301be9e3f1367F0991f3';

// Older copies with slightly different ABIs
// const deployed_address = '0x40D0FFc416F3496bb7393eD5B8C61F91fe3df0d1';
// const deployed_address = '0xB9F96050b85602F8e3A83485064b5b83A4977532'

export default new web3.eth.Contract(lottery_interface, deployed_address);
