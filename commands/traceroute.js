const conf = new (require('conf'))()
const chalk = require('chalk')


function traceroute() {
    netScan.traceroute('google.com',(hop)=>{
        console.log(hop)
    })
}