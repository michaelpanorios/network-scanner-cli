#! /usr/bin/env node
// __   _ _______ _______ _  _  _  _____   ______ _     _ _______  ______
// | \  | |______    |    |  |  | |     | |_____/ |____/  |______ |_____/
// |  \_| |______    |    |__|__| |_____| |    \_ |    \_ |______ |    \_
//
// Author: Mike P.
const NetworkScanner = require('network-scanner-js')
const netScan = new NetworkScanner()
const program = require('commander')
const figlet = require('figlet')
const fs = require('fs');

program.version('Currently under construction v0.0.1')
program.description(console.log(
                        figlet.textSync('Networker', {
                            font: 'Cybermedium',
                            horizontalLayout: 'default',
                            verticalLayout: 'default',
                            width: 100,
                            whitespaceBreak: true
                        })
                        )
                    )

program.option('-l, --lan        <string>', 'takes as input an IP & analyzes which hosts are online.')
       .option('-s, --subnet     <string>', 'takes as input an ip/subnet combination & analyzes subnet aspects.')
       .option('-d, --dns        <string>', 'takes as input a URL & performs a DNS lookup.')
       .option('-st,--speed              ', 'performs a network speedtest to evaluate the networks throughtput speed.')
       .option('-t, --traceroute <string>', 'performs traceroute on the specified URL.')
       .option('-sl,--sublan     <string>', 'takes as input an ip/subnet combination & perform subnet lan scan.')
       .option('-lm,--lmonitor   <string>', 'takes as input an ip range & opens a monitor portal with latency stats.')
       .option('-f, --file       <string>', 'takes as input an ip range & writes a file with the discovered hosts')
       .option('-m, --monitor    ', '')
       .parse()

const options = program.opts()
// TODO Error handlers

// Lan scan example: 192.168.1.0-254
if (options.lan) {
    netScan.ipScan(options.lan, hosts => {
        console.log(hosts)
    })
}

// Subnet example: 192.168.1.0/24
if (options.subnet) {
    netScan.getSubnet(options.subnet).then((net)=>{
        console.log(net)
    })
}

// DNS example: w3schools.com
if (options.dns) {
    netScan.lookup(options.dns, (addresses) => {
        console.log(addresses)
    })
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

// Subnet lan scan example: 192.168.1.0/24
if (options.sublan) {
    netScan.getSubnet(options.sublan).then((net)=>{
        netScan.ipScan(net.host_range, host => {
          console.log(host)
        })
    })
}

// LAN Scan & monitor example: '192.168.4.10', '192.168.4.18', '192.168.4.34', '192.168.4.68', '192.168.4.93','192.168.4.11'
if (options.lmonitor) {
    hostsArray = []
    netScan.ipScan(options.lmonitor, hosts => {
        hostsArray.push(hosts.host)
        const writeStream = fs.createWriteStream('hosts.txt');
        const pathName = writeStream.path;
        hostsArray.forEach(value => writeStream.write(`${value}\n`));
        // handle the errors on the write process
        writeStream.on('error', (err) => {
            console.error(`There is an error writing the file ${pathName} => ${err}`)
        });
        // close the stream
        writeStream.end();
    })
    console.log(`File hosts.txt created on directory: ` + __dirname)
}

if (options.file!==undefined && options.monitor) {
    var array = fs.readFileSync('hosts.txt').toString().split("\n")
    array.pop()
    netScan.monitorCluster(array)
}

// ['192.168.1.10', '192.168.4.18', '192.168.4.34', '192.168.4.68', '192.168.4.93','192.168.4.11',]


function isNotEmpty(obj) {
    return Object.keys(obj).length !== 0;
}






