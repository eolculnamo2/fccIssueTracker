var nodemailer = require('nodemailer');
var express = require('express')
var path = require('path')
var fs = require('fs')

module.exports = {
    ticketUpdate: function(userEmail, assignedBy, ticketName){

        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.EMAIL_PASS
            }
        });

    fs.readFile(path.join(__dirname,"..","/public/emails/newAssignedTicket.html"),"utf8",(err,info)=>{

        let arr = info.split('#split#')
        arr[1] = assignedBy;
        arr[3] = ticketName
        let payload = arr.join('')

        let mailOptions = {
            from: process.env.EMAIL,
            to: userEmail,
            subject: assignedBy + " assigned a Ticket to you on Issue Tracker",
            text: "New Ticket on Issue Tracker",
            html: payload
        }
        transporter.sendMail(mailOptions, function (err, info) {
            if(err)
                console.log(err)
            else
                console.log(payload);
            });
        });
    },
    welcomeUser: function(userEmail, name){

        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.EMAIL_PASS
            }
        });

    fs.readFile(path.join(__dirname,"..","/public/emails/newUser.html"),"utf8",(err,info)=>{

        let arr = info.split('#split#')
        arr[1] = name;
        let payload = arr.join('')

        let mailOptions = {
            from: process.env.EMAIL,
            to: userEmail,
            subject: "Welcome to IssueTracker",
            text: "Welcome to Issue Tracker!",
            html: payload
        }
        transporter.sendMail(mailOptions, function (err, info) {
            if(err)
                console.log(err)
            else
                console.log(payload);
            });
        });
    }

}