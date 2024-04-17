class Start extends Scene {
    create() {
        this.engine.setTitle(this.engine.storyData.Title);//  this text using this.engine.storyData to find the story title
        this.engine.addChoice("Begin the story");
    }

    handleChoice() {
        this.engine.gotoScene(Location, this.engine.storyData.InitialLocation);//   this text by the initial location of the story
    }
}

class Location extends Scene {
    create(key) {
        let locationData = this.engine.storyData.Locations[key];
        this.engine.show(locationData.Body);
        
        if (locationData.Items) {
            for (let item in locationData.Items) {
                this.engine.addItem(item, locationData.Items[item]); // Adds item to inventory
            }
        }
        
        locationData.Choices.forEach(choice => {
            if (choice.RequiredItem) {
                if (this.engine.hasItem(choice.RequiredItem)) { // Checks if required item is in inventory
                    this.engine.addChoice(choice.Text, choice);
                } else {
                    this.engine.show("You need a specific key to proceed.");
                }
            } else {
                this.engine.addChoice(choice.Text, choice);
            }
        });
    }

    handleChoice(choice) {
        if (choice) {
            this.engine.show("> " + choice.Text);
            this.engine.gotoScene(Location, choice.Target);
        } else {
            this.engine.gotoScene(End);
        }
    }
}



class End extends Scene {
    create() {
        this.engine.show("<hr>");
        this.engine.show(this.engine.storyData.Credits);
    }
}

Engine.load(Start, 'myStory.json');
