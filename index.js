const NetworkScanner = require('network-scanner-js')
const netScan = new NetworkScanner()



netScan.traceroute('google.com',(hop)=>{
    console.log(hop)
})