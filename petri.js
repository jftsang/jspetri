const speciesColors = [
    'red', 'yellow', 'green', 'cyan', 'blue', 'magenta'
];
const stateColors = {
    findFood: 'black',
    findMate: 'red'
};
const foodSize = 3;
const foodColor = 'lightgreen'

function PetriDish(width, height) {
    this.width = width;
    this.height = height;
    this.creatures = new Set();
    this.foods = new Set()

    this.elem = document.getElementById('petriDish');
    this.elem.classList.add('petri-dish')
    this.elem.style.width = width + 'px';
    this.elem.style.height = height + 'px';

    this.draw = () => {
        this.creatures.forEach((creature) => {
            creature.draw();
        })
    }
}

function Creature(petriDish, x, y, size, species) {
    this.petriDish = petriDish;
    this.x = x;
    this.y = y;
    this.age = 0;
    this.size = size;
    this.species = species;
    this.state = 'findFood';

    this.petriDish.creatures.add(this);
    this.elem = this.petriDish.elem.appendChild(
        document.createElement('div')
    );
    this.elem.classList.add('creature');

    this.draw = () => {
        this.elem.style.left = (this.x - this.size) + 'px';
        this.elem.style.top = (this.y - this.size) + 'px';
        this.elem.style.width = this.size + 'px';
        this.elem.style.height = this.size + 'px';
        this.elem.style.border = '2px solid';
        this.elem.style.borderColor = stateColors[this.state];
        this.elem.style.borderRadius = this.size + 'px';
        this.elem.style.backgroundColor = speciesColors[this.species % 6];
    };

    this.move = (dt) => {
        this.age += dt;
        if (this.state === 'findFood')
            this.findFood(dt);
        if (this.state === 'findMate')
            this.findMate(dt);
        throw 'unknown state';
    }

    this.destroy = () => {
        this.elem.remove();
        this.petriDish.creatures.delete(this);
    }
}

function Food(petriDish, x, y) {
    this.petriDish = petriDish;
    this.x = x;
    this.y = y;
    this.petriDish.foods.add(this);

    this.elem = this.petriDish.elem.appendChild(
        document.createElement('div')
    );
    this.elem.classList.add('food');

    this.elem.style.left = (this.x - foodSize) + 'px';
    this.elem.style.top = (this.y - foodSize) + 'px';
    this.elem.style.width = foodSize + 'px';
    this.elem.style.height = foodSize + 'px';
    this.elem.style.borderRadius = foodSize + 'px';
    this.elem.style.backgroundColor = foodColor;

    this.destroy = () => {
        this.elem.remove();
        this.petriDish.foods.delete(this);
    }
}

const game = new PetriDish(400, 300);
const c = new Creature(game, 270, 160, 50, 5);
new Creature(game, 32, 210, 16, 3);
for (let nF = 0; nF < 100; nF++) {
    x = Math.random() * game.width;
    y = Math.random() * game.height;
    new Food(game, x, y);
}
game.draw();