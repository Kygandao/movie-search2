const got = require('got');
const inquirer = require('inquirer');
class MovieSearch {
    questions = {
        titleQ: {
            name: 'title',
            message: 'what movie would you like to search for?',
            type: 'input',
        },
        searchTypeQ: {
            name: 'searchType',
            message: 'Please select a search you would like to use',
            type: 'list',
            choices: ['searchByTitle', 'searchByQuery', 'exit']
        },
        queryQ: {
            name: 'query',
            message: 'Please enter your query',
            type: 'input',
        },
    }
    async promptSearchType(){
            try{
                const {searchType} = await inquirer.prompt([this.questions.searchTypeQ])
                const result = await this[searchType](); 
                if(searchType === 'exit') return '';            
                console.log(JSON.parse(result.body));
                this.promptSearchType(); 
            } catch(err){
                console.error('in general catch: ', err.message)
            }
    } 
    exit(){
        console.log('goodbye!');
    }
    async searchByTitle(){
        const {title} = await inquirer.prompt([this.questions.titleQ])
        return got(`https://www.omdbapi.com/?apikey=trilogy&t=${title}`)
            .catch(err=> console.log('inside specific catch: ', err))
    }
    async searchByQuery(){
        const {query} = await inquirer.prompt([this.questions.queryQ])
        return got(`https://www.omdbapi.com/?apikey=trilogy&s=${query}`)
    }
}
module.exports = MovieSearch;