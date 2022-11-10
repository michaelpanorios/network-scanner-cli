#! /usr/bin/env node
const NetworkScanner = require('network-scanner-js')
const netScan = new NetworkScanner()
const program = require('commander')
const figlet = require('figlet')

program.version('0.0.1')
program.description('Description')
program
       .option('-l, --lan        <string>', 'take as input an IP and analyzes which hosts are online.')
       .option('-s, --subnet     <string>', 'take as input an ip/subnet combination and analyzes subnet aspects')
       .option('-d, --dns        <string>', 'take as input a URL and performs a DNS lookup.')
       .option('-st,--speed              ', 'perform a network speedtest to evaluate the networks throughtput speed')
       .option('-t, --traceroute <string>', 'perform traceroute on the specified URL.')
       .parse()

const options = program.opts()


// Lan scan example: 192.168.1.0-254
if (options.lan) {
    netScan.ipScan(options.lan, host => {
        console.log(host)
    })
}

// Subnet example: 192.168.1.0/24
if (options.subnet) {
    netScan.getSubnet(options.subnet).then((net)=>{
        console.log(net)
    })
}

// DNS example: w3schools.com
// TODO check the dns functionality.
if (options.dns) {
    netScan.lookup(options.dns, (addresses) => {
        console.log(addresses)
    })
    netScan.getSubnet(options.dns)
    console.log( netScan.getSubnet(options.dns))
}

if (options.speed) {
    let connectionType = 'single' //Specifies whether you want to test with multiple connections or a single connection, set variable to 'single' if you want to test a single connection, default is multi
    netScan.speedTest(connectionType).then((speed)=>{
        console.log("Your network's speed is: "+ speed)
    })
}

// Traceroute example: google.com
if (options.traceroute) {    
    netScan.traceroute(options.traceroute,(hop)=>{
        console.log(hop)
    })
}
