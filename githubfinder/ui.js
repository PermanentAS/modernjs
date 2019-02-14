class UI {
    constructor() {
        this.profile = document.getElementById('profile');
    }

    showProfile(user) {
        this.profile.innerHTML = `
            <div class="card card-body mb-3">
                <div class="row">
                    <div class="col-md-3">
                        <img class="container-fluid mb-2" src="${user.avatar_url}">
                        <a href="${user.html_url}" target="_blank" class="btn btn-primary btn-block mb-4">View Profile</a>
                    </div>
                    <div class="col-md-9">
                        <span class="badge mr-3 badge-primary">Public Repos: ${user.public_repos}</span>
                        <span class="badge mr-3 badge-danger">Public Gists: ${user.public_gists}</span>
                        <span class="badge mr-3 badge-success">Followers: ${user.followers}</span>
                        <span class="badge mr-3 badge-info">Following: ${user.following}</span>
                    
                        <br><br>

                        <ul class="list-group">
                            <li class="list-group-item">Company: ${user.company}</li>
                            <li class="list-group-item">Website/Blog: ${user.blog}</li>
                            <li class="list-group-item">Location: ${user.location}</li>
                            <li class="list-group-item">Member Since: ${user.created_at}</li>
                        </ul>
                    </div>    
                </div>
            </div>

            <h3 class="page-heading mb-3">Latest Repos</h3>
            <div id="repos"></div>
        `;
    }

    showRepos(repos) {
        let output = '';

        repos.forEach((repo) => {
            output += `
                <div class="card card-body mb-2">
                    <div class="row">
                        <div class="col-md-6">
                            <a href="${repo.html_url}" target="_blank">${repo.name}</a>
                        </div> 
                        <div class="col-md-6">
                            <span class="badge badge-primary mr-3">Stars: ${repo.stargazers_count}</span>
                            <span class="badge badge-secondary mr-3">Watchers: ${repo.watchers}</span>
                            <span class="badge badge-success mr-3">Forks: ${repo.forks_count}</span>
                        </div> 
                    </div> 
                </div>
            `;
        });

        //Output repo
        document.getElementById('repos').innerHTML = output;
    }

    clearProfile() {
        this.profile.innerHTML = '';
    }

    showAllert(message, className) {
        //Clear remaining alerts
        this.clearAllert();
        //Create div
        const div = document.createElement('div');
        div.className = className;
        //add text
        div.appendChild(document.createTextNode(message));

        //get parent
        const container = document.querySelector('.searchContainer')
        //get search box
        const search = document.querySelector('.search');
        //insert alert
        container.insertBefore(div, search);

        setTimeout(() => {
            this.clearAllert();
        }, 3000);
    }

    clearAllert() {
        const currentAllert = document.querySelector('.alert');

        if(currentAllert){
            currentAllert.remove();
        }
    }
}