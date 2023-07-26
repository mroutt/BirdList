import { LightningElement, wire } from 'lwc';
import {refreshApex} from '@salesforce/apex';
import getAllBirds from '@salesforce/apex/BirdListController.getAllBirds';
import createBird from '@salesforce/apex/BirdListController.createBird';

export default class BirdList extends LightningElement {

    @wire(getAllBirds, {})
    birds;

    birdNameInput;

    status;

    renderedCallback() {

        this.birdNameInput = this.template.querySelector('.bird-name');

    }

    newBird() {

        const birdName = this.birdNameInput.value;
        createBird({name: birdName}).then(() => {
            this.status = birdName + ' created successfully';
            this.birdNameInput.value = '';
            refreshApex(this.birds);
        }).catch((error) => {
            this.status = JSON.stringify(error);
        });

    }
}