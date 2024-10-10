
import User from './user.js';

export default class App {
    constructor() {
        this.formMessage = document.getElementById('formMessage');
        this.userForm = document.getElementById('userForm');
        this.listContainer = document.getElementById('list-container');

        this.userForm.addEventListener('submit', this.onSubmit.bind(this)); 
        this.loadUsers();
    }

    async loadUsers() {
        try {
            const users = await User.getAll();
            this.listContainer.innerHTML = '';

            users.forEach(user => this.showUser(user));
        } catch (error) {
            this.formMessage.textContent = 'Error cargando usuarios';
            console.log(error)
        }
    }

    showUser(user) {
        const userDiv = document.createElement('div');
        userDiv.innerHTML = `
            <img src="${user.photo}" alt="${user.firstName}">
            <div class="center">
                <h5>Nombres</h5>
                <p>${user.firstName} ${user.lastName}</p>
            </div>
            <div class="center">
                <h5>Cargo</h5>
                <p>${user.jobTitle}</p>
            </div>
            <div class="center">
                <h5>Telefono</h5>
            <p>${user.phone}</p>
            </div>
            <div class="center">
                <h5>Email:</h5>
                <p>${user.email}</p>
            </div>
        `;
        userDiv.addEventListener('click', () => this.fillForm(user));
        this.listContainer.appendChild(userDiv);
    }

    async onSubmit(event) {
        event.preventDefault();
        const data = {
            firstName: this.userForm.firstName.value,
            lastName: this.userForm.lastName.value,
            jobTitle: this.userForm.jobTitle.value,
            phone: this.userForm.phone.value,
            email: this.userForm.email.value,
        };

        try {
            if (this.userForm.dataset.id) {
                await User.saveOne(this.userForm.dataset.id, data);
                this.formMessage.textContent = 'Usuario actualizado con éxito';
            } else {
                await User.saveOne(data);
                this.formMessage.textContent = 'Usuario creado con éxito';
            }
            this.loadUsers();
        } catch (error) {
            this.formMessage.textContent = 'Error en la operación';
        } finally {
            this.userForm.reset();
            delete this.userForm.dataset.id;
        }
    }

    fillForm(user) {
        this.userForm.firstName.value = user.firstName;
        this.userForm.lastName.value = user.lastName;
        this.userForm.jobTitle.value = user.jobTitle;
        this.userForm.phone.value = user.phone;
        this.userForm.photo.value = user.photo;
        this.userForm.email.value = user.email;
        this.userForm.dataset.id = user.id;
    }
}