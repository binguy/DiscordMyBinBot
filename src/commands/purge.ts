import * as Discord from "discord.js";
import { IBotCommand } from "../api";

export default class purge implements IBotCommand {
    
    private readonly _command = "purge"
    
    help(): string 
    {
        return "(Admin Only) Deletes the desired number of messages from the channel";
    }    

    isThisCommand(command: string): boolean 
    {
        return command === this._command;
    }

    async runCommand(args: string[], msgObject: Discord.Message, client: Discord.Client): Promise<void> 
    {

        //Clean-up our messages
        msgObject.delete()
        .catch(console.error);

        //Make sure that the person using the command is an Admin
        if(!msgObject.member.hasPermission("ADMINISTRATOR"))
        {
            msgObject.channel.send(`Sorry ${msgObject.author.username} but this command is only for Admins`)
            .then(msg =>{
                (msg as Discord.Message).delete(5000)
                .catch(console.error);
            });
            return;
        }

        //Make sure that they said how many messages to delete
        if(!args[0])
        {
            msgObject.channel.send(`Sorry ${msgObject.author.username} but you must supply and the numbers of messages to be deleted`)
            .then(msg =>{
                (msg as Discord.Message).delete(5000)
                .catch(console.error);
            });
            return;
        }

        //Convert args[0] into a number
        let numberOfMessagesToDelete = Number(args[0]);

        //Make sure args[0] is actually a number
        if(isNaN(numberOfMessagesToDelete))
        {
            msgObject.channel.send(`Sorry ${msgObject.author.username} but that is not a valid number`)
            .then(msg =>{
                (msg as Discord.Message).delete(5000)
                .catch(console.error);
            });
            return;
        }
        //Make sure the number is an integer
        numberOfMessagesToDelete = Math.round(numberOfMessagesToDelete);

        //Delete the desired number of messages
        msgObject.channel.bulkDelete(numberOfMessagesToDelete)
        .catch(console.error);
    }
}