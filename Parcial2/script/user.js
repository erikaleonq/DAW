const baseURL = 'http://ec2-3-138-183-128.us-east-2.compute.amazonaws.com:4010/users';

export default class User {
    constructor(id, firstName, lastName, jobTitle, email, phone, photo) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.jobTitle = jobTitle;
        this.email = email;
        this.phone = phone;
        this.photo = photo;
    }

    static async getAll() {
        let list = [];
        try {
            const resp = await fetch(baseURL);
            if (!resp.ok) {
            throw new Error('Hubo error trayendo la info');
            }
            const data = await resp.json();
            data.forEach(element => {
            list.push(new User(element.id, element.firstName, element.lastName, element.jobTitle, element.email, element.phone, element.photo));
            });
            return list;
        } catch (error) {
            console.error('Error al obtener todos los usuarios:', error);
            throw error;
        }
    }

    static async getOne(userId) {
        try {
            const resp = await fetch(`${baseURL}/${userId}`);
            if (!resp.ok) {
            throw new Error('Error al obtener el usuario');
            }
            const data = await resp.json();
            return new User(data.id, data.firstName, data.lastName, data.jobTitle, data.email, data.phone, data.photo);
        } catch (error) {
            console.error('Hubo error al traer un solo usuario:', error);
            throw error;
        }
    }

    static async saveOne(data) {
        try {
            const resp = await fetch(baseURL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });
            if (!resp.ok) {
                throw new Error('Error al crear el usuario');
            }
            const createdData = await resp.json();
            console.log("Cambios realizados. Usuario:", createdData)
            return new User(createdData.id, createdData.firstName, createdData.lastName, createdData.jobTitle, createdData.email, createdData.phone, createdData.photo);
        } catch (error) {
            console.error('Error al crear usuario:', error);
            throw error;
        }
    }

}