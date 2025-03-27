import { makeAutoObservable } from "mobx";
import { Contact } from "../types";

export class ContactsStore {
    contacts: Contact[] = [
        {
            id: "isudfnjkxcvsdfghio",
            firstName: "Иван",
            lastName: "Иванович",
            middleName: "Иванов",
            email: "test@mail.ru",
            phoneNumber: "+7532342341",
            jobTitle: "Менеджер",
            company: "ООО Строй"
        },
        {
            id: "ashi9odfgisfad",
            firstName: "Александр",
            lastName: "Александрович",
            middleName: null,
            email: "test2@mail.ru",
            phoneNumber: "+7565283341",
            jobTitle: null,
            company: null
        },
        {
            id: "sdf98734hjksdf",
            firstName: "Мария",
            lastName: "Семенова",
            middleName: "Викторовна",
            email: "maria.s@mail.ru",
            phoneNumber: "+79231234567",
            jobTitle: "HR-специалист",
            company: "Рекрутинговое агентство"
        },
        {
            id: "qwepoi123098",
            firstName: "Дмитрий",
            lastName: "Козлов",
            middleName: null,
            email: "dmitry.kozlov@mail.ru",
            phoneNumber: "+79162349876",
            jobTitle: null,
            company: null
        },
        {
            id: "lkjh456yuiop",
            firstName: "Екатерина",
            lastName: "Петрова",
            middleName: "Андреевна",
            email: "katya.pet@mail.ru",
            phoneNumber: "+79992223344",
            jobTitle: "Маркетолог",
            company: "Агентство рекламы"
        },
        {
            id: "xcnv0987zxcvb",
            firstName: "Сергей",
            lastName: "Васильев",
            middleName: null,
            email: "sergey.v@mail.ru",
            phoneNumber: "+79215556677",
            jobTitle: "Аналитик",
            company: "Финансовый сектор"
        },
        {
            id: "asdwqer8907xcv",
            firstName: "Анна",
            lastName: "Морозова",
            middleName: "Игоревна",
            email: "anna.morozova@mail.ru",
            phoneNumber: "+79876543210",
            jobTitle: "Дизайнер",
            company: null
        },
        {
            id: "vcxz9087qwerty",
            firstName: "Павел",
            lastName: "Федоров",
            middleName: null,
            email: "pavel.fed@mail.ru",
            phoneNumber: "+79163457890",
            jobTitle: "Проектный менеджер",
            company: "Строительная компания"
        }
    ];

    constructor() {
        makeAutoObservable(this);
    }

    addContact(newContact: Contact) {
        this.contacts.push(newContact);
    }

    removeContact(id: Contact["id"]) {
        this.contacts = this.contacts.filter(contact => contact.id !== id);
    }

    updateContact(id: Contact["id"], newFields: Partial<Contact>) {
        this.contacts = this.contacts.map(contact => {
            if (contact.id === id) {
                return { ...contact, ...newFields }
            }
            return contact;
        })
    }
}