const data = [
    {
        name: 'John Doe',
        age: 32,
        gender: 'male',
        lookingfor: 'female',
        location: 'Boston MA',
        image: 'https://randomuser.me/api/portraits/men/97.jpg'
    },
    {
        name: 'Alan Vasquez',
        age: 45,
        gender: 'male',
        lookingfor: 'female',
        location: 'Miami FL',
        image: 'https://randomuser.me/api/portraits/men/36.jpg'
    },
    {
        name: 'Randall Webb',
        age: 30,
        gender: 'male',
        lookingfor: 'female',
        location: 'Lynn MA',
        image: 'https://randomuser.me/api/portraits/men/64.jpg'
    }
];

const profiles = profileIterator(data);

//Call first profile
nextProfile()

//next event
document.getElementById('next').addEventListener('click', nextProfile);

function nextProfile() {
    const currentProfile = profiles.next().value;
    console.log(currentProfile);

    if (currentProfile !== undefined) {
        document.getElementById('profileDisplay').innerHTML = `
            <ul class="list-group">
                <li class="list-group-item">Name: ${currentProfile.name}</li>
                <li class="list-group-item">Age: ${currentProfile.age}</li>
                <li class="list-group-item">Location: ${currentProfile.location}</li>
                <li class="list-group-item">Preference: ${currentProfile.gender} looking for ${currentProfile.lookingfor}</li>
            </ul>
        `;

        document.getElementById('imageDisplay').innerHTML = `<img src="${currentProfile.image}" class="rounded">`
    } else {
        window.location.reload();
    }
    
}

//Iterator
function profileIterator(profiles) {
    let nextIndex = 0;

    return{
        next: function() {
            return nextIndex < profiles.length ?
            {value: profiles[nextIndex++], done: false} :
            {done: true}
        }
    };
}

