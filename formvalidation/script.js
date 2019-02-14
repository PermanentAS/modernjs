document.getElementById('name').addEventListener('blur', vaildateName);
document.getElementById('zip').addEventListener('blur', vaildateZip);
document.getElementById('email').addEventListener('blur', vaildateEmail);
document.getElementById('phone').addEventListener('blur', vaildatePhone);

function vaildateName() {
    const name = document.getElementById('name');
    const regExp = /^[A-Za-z]{2,10}$/;

    if (!regExp.test(name.value)) {
        name.classList.add('is-invalid');
    } else {
        name.classList.remove('is-invalid');
    }
}

function vaildateZip() {
    const zip = document.getElementById('zip');
    const regExp = /^[0-9]{5}(-[0-9]{4})?/;

    if (!regExp.test(zip.value)) {
        zip.classList.add('is-invalid');
    } else {
        zip.classList.remove('is-invalid');
    }
}

function vaildateEmail() {
    const email = document.getElementById('email');
    const regExp = /^([A-Za-z0-9_\-\.]+)@([A-Za-z0-9_\-\.]+)\.([A-Za-z]{2,5})$/;

    if (!regExp.test(email.value)) {
        email.classList.add('is-invalid');
    } else {
        email.classList.remove('is-invalid');
    }
}

function vaildatePhone() {
    const phone = document.getElementById('phone');
    const regExp = /^\(?\d{3}\)?[-. ]?\d{3}[-. ]?\d{2}[-. ]?\d{2}[-. ]?$/;

    if (!regExp.test(phone.value)) {
        phone.classList.add('is-invalid');
    } else {
        phone.classList.remove('is-invalid');
    }
}



