#! /usr/bin/env node
const NetworkScanner = require('network-scanner-js')
const netScan = new NetworkScanner()
const program = require('commander')
const figlet = require('figlet')

program.version('0.0.1')

// Commands available
program.command('-cL <ip-address>').description('take as input an IP and analyzes which hosts are online.')//.action(lanScan)
program.command('-cS <ip-address>').description('take as input an IP-Address/subnet combination and analyzes subnet aspects')//.action(subnet-calc)
program.command('-cD <ip-address>').description('take as input a URL and performs a DNS lookup. ')//.action(dns-lookup)
program.command('-cS <ip-address>').description('perform a network speedtest to evaluate the networks throughtput speed')//.action(speed-test)
program.command('-cT <ip-address>').description('perform traceroute on the specified URL.')//.action(traceroute)

async function lanScan(ip) {
    netScan.ipScan('192.168.1.0-254', host => {
        console.log(host)
      })
}

async function subnetCalculation(){
    netScan.getSubnet('192.168.1.0/24').then((net)=>{
        console.log(net)
    })    
}

async function dnsLookUp() {
    netScan.lookup('w3schools.com', (addresses) => {
        console.log(addresses)
    })
    const subnet = await netScan.getSubnet('192.168.1.0/24')
    console.log(subnet)
}

async function speedTest() {
    let connectionType = 'multi' //Specifies whether you want to test with multiple connections or a single connection, set variable to 'single' if you want to test a single connection, default is multi
    netScan.speedTest(connectionType).then((speed)=>{
        console.log(speed)
    })
}

async function traceroute() {
    netScan.traceroute('google.com',(hop)=>{
        console.log(hop)
    })
}


program.parse(process.argv)


