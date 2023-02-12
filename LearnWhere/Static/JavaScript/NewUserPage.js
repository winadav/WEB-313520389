
const existUsers = ['winadav', 'nadavThe1', 'nadi']
const existEmails = ['winadav@gmail.com','nadav9@post.bgu.ac.il']
let check1,check2,check3,check4,check5 = false
const myForm = document.querySelector('#newUserForm')
const nameInput = document.querySelector('#Username')
const passwordInput = document.querySelector('#Password')
const emailInput = document.querySelector('#Email')
const firstNInput = document.querySelector('#FirstName')
const lastNInput = document.querySelector('#LastName')
const phoneInput = document.querySelector('#PhoneNum')

const msgUsernameEmp = document.querySelector('.msgUsernameEmp')
const msgUsernameExist = document.querySelector('.msgUsernameExist')
const msgPasswordEmp = document.querySelector('.msgPasswordEmp')
const msgEmailEmp = document.querySelector('.msgEmailEmp')
const msgEmailExist = document.querySelector('.msgEmailExist')
const userList  = document.querySelector('.users')

const onSubmit = (e) => {
    e.preventDefault()
    console.log(nameInput)
    console.log(nameInput.value)

    if (nameInput.value === '') { //validations check
        msgUsernameEmp.innerHTML = 'Please Enter Username'
        msgUsernameEmp.classList.add('error')
                setTimeout(() => {
                    msgUsernameEmp.innerHTML = ''
                    msgUsernameEmp.classList.remove('error')
                }, 4000)
        check1 = false
    } else {
        check1 = true
    }
    if (existUsers.includes(nameInput.value)) {
        msgUsernameExist.innerHTML = 'Username is Already Taken'
        msgUsernameExist.classList.add('error')
                        setTimeout(() => {
                    msgUsernameExist.innerHTML = ''
                    msgUsernameExist.classList.remove('error')
                }, 4000)
        check2 = false
    } else {
        check2 = true
    }
    if (passwordInput.value === '') {
        msgPasswordEmp.innerHTML = 'Please Enter Password'
        msgPasswordEmp.classList.add('error')
                        setTimeout(() => {
                    msgPasswordEmp.innerHTML = ''
                    msgPasswordEmp.classList.remove('error')
                }, 4000)
        check3= false
    } else {
        check3 = true
    }
    if (emailInput.value === '') {
        msgEmailEmp.innerHTML = 'Please Enter Email'
        msgEmailEmp.classList.add('error')
                        setTimeout(() => {
                    msgEmailEmp.innerHTML = ''
                    msgEmailEmp.classList.remove('error')
                }, 4000)
        check4 = false
    } else {
        check4 = true
    }
    if (existEmails.includes(emailInput.value)) {
        msgEmailExist.innerHTML = 'Email is Already Taken'
        msgEmailExist.classList.add('error')
                        setTimeout(() => {
                    msgEmailExist.innerHTML = ''
                    msgEmailExist.classList.remove('error')
                }, 4000)
        check5 = false
    }
    else {
        check5 = true
    }
    if (check1 === true && check2 ===true && check3 ===true && check4 ===true && check5 ===true ) {
        const li = document.createElement('li')
        li.appendChild(document.createTextNode(`${nameInput.value}:${passwordInput.value}:${emailInput.value}:${firstNInput.value}:${lastNInput.value}:${phoneInput.value}`))
        userList.appendChild(li)
    }

}
myForm.addEventListener('submit', onSubmit)
