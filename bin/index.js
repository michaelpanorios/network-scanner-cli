#! /usr/bin/env node
const NetworkScanner = require('network-scanner-js')
const netScan = new NetworkScanner()
const program = require('commander')

program.version('0.0.1')

// Commands available
program.command('lan').description('Take as input an IP and analyzes which hosts are online.')//.action(lanScan)
program.command('subnet-calc').description('Take as input an IP-Address/subnet combination and analyzes subnet aspects')//.action(subnet-calc)
program.command('dns-lookup').description('Take as input a URL and performs a DNS lookup. ')//.action(dns-lookup)
program.command('speed-test').description('Perform a network speedtest to evaluate the networks throughtput speed')//.action(speed-test)
program.command('traceroute').description('Perform traceroute on the specified URL.').action(traceroute)

// Options available
async function traceroute({domain}) {
    netScan.traceroute(domain,(hop)=>{
        console.log(hop)
    })
}

// 1. How to add <ip address> as an option
// 2. How to beautify the results

program.parse(process.argv)


