import { log } from "console";
import http, { IncomingMessage, ServerResponse } from "http"    
import  Prompt  from "prompt-sync";

const prompt = Prompt()

function onStart() {
    console.log("Server is Running");
}

let phone = [`  
    S21,
    Redmi 9,
    Iphon 15
    Honor x9b`]


let noutbook = `
    HP laptop15,
    MSI GF63,
    Lenavo
    Asus`

function handler(request:IncomingMessage, respons:ServerResponse){
    if (request.method === "GET") {
        
        if (request.url === "/phone") {
            respons.writeHead(200)
            respons.write(phone)
            respons.end(`
            Request closed`)
        }
        else if (request.url === "/noutbook") {
            
            const buffer = Buffer.from(noutbook,"utf-8")
            const contentType = "text-plain"
            const contentLenght = buffer.byteLength

            respons.writeHead(200, {
                'Content-Type':contentType,
                "Content-lenght":contentLenght
            })
            respons.write(noutbook)
            respons.end(`
                Request closed`)
        }
        else{
            respons.writeHead(400)
            respons.end("Url Not Found")
        }

    }
    else if (request.method === "POST") {
        if (request.url === "/phone/") {
            phone.push(request.url)
            console.log(phone);
            
        }
    }
}

const server = http.createServer(handler)

server.listen(8080, "localhost",onStart)