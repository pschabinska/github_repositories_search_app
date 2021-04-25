class Repo {
    constructor(name, stargazers) {
        this.name = name;
        this.stargazers = stargazers;
      }
}

var form = document.getElementById("Form")
form.addEventListener('submit', function(e){
    e.preventDefault()
    
    var search = document.getElementById("search").value
    var originalName = search.split('').join('')
    alert(originalName)

    fetch("https://api.github.com/users/"+originalName+"/repos?per_page=100")
    .then((result) => {
        return result.json()
    })

    .then((data) =>{
        console.log(data.length);
        var repos = [];

        for (i = 0; i < data.length; i++) {
            repos.push(new Repo(data[i]["name"], data[i]["stargazers_count"]))
        }
        
        repos.sort(function(a,b){
            return b.stargazers - a.stargazers;
        })

        var finalText ="";
        var i;
        for (i = 0; i < repos.length; i++) {
            finalText += "<li class=\"list-group-item d-flex justify-content-between align-items-center\">" + repos[i].name + "<span class=\"badge badge-success badge-pill\">"+repos[i].stargazers+"</span> </li>";
        }
        
        document.getElementById('target-id').innerHTML = finalText ;
        


    })
})