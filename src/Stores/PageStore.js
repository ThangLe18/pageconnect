import {
  observable,
  action,
  computed,
  makeObservable,
  autorun,
  reaction,
  when,
} from 'mobx';
import {createContext} from 'react';

class UserStore {
  name = 'Le Duc Thang';
  age = 18;

  constructor() {
    makeObservable(this, {
      name: observable,
      age: observable,
      setName: action.bound,
      setAge: action.bound,
      doubleAge: computed,
      increaseAge: action.bound,
      decreaseAge: action.bound,
    });
    autorun(() => console.log('Age change, jump to AUTORUN', this.age));
    reaction(
      () => this.age,
      age => {
        if (age > 25) {
          console.log('age > 25');
        } else {
          console.log('age <= 25');
        }
      },
    );
    when(
      () => this.age > 27,
      () => console.log('age > 27, call WHEN function'),
    );
  }

  setName = name => {
    this.name = name;
  };

  setAge = age => {
    this.age = age;
  };

  increaseAge = () => {
    this.age++;
  };

  decreaseAge = () => {
    this.age--;
  };

  get doubleAge() {
    return this.age * 2;
  }
}

let userStore = new UserStore();

export default userStore;
