class Tyre {
  constructor(brand, size) {
    this.brand = brand;
    this.size = size;
  }
}

class Car {
  constructor(variant, tyre, door, seat, year, warranty) {
    this.variant = variant;
    this.tyre = tyre;
    this.door = door;
    this.seat = seat;
    this.year = year;
    this.warranty = warranty;
    this.engineNumber = Car.engineNumber();
  }

  static engineNumber() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
      /[xy]/g,
      function (c) {
        var r = (Math.random() * 16) | 0,
          v = c == "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      }
    );
  }
}

class Toyota extends Car {
  constructor(year) {
    super('Toyota', new Tyre('Dunlop', 17), 5, 6, year, 4);
  }
}

class Volvo extends Car {
  constructor(year) {
    super('Volvo', new Tyre('Bridgestone', 15), 4, 4, year, 3);
  }
}

class CarFactory {
  constructor() {
    this.cars = [];
  }

  static getRandom() {
    return Math.floor(Math.random() * 10) + 1;
  }

  produce(year) {
    for (let i = 0; i < CarFactory.getRandom(); i++) {
      this.cars.push(new Toyota(year));
    }

    for (let i = 0; i < CarFactory.getRandom(); i++) {
      this.cars.push(new Volvo(year));
    }
  }

  result() {
    console.log("Hasil Produksi Mobil : ");
    this.cars.forEach((item, i) => {
      console.log(`
              ${i + 1}. Engine Number : ${item.engineNumber}
                  Variant       : ${item.variant}
                  Tyre          : ${item.tyre.brand} with ${item.tyre.size} Inch
                  Door          : ${item.door}
                  Seat          : ${item.seat} seat
                <------------------------------------------------------>
              `);
    });
  }

  guaranteeSimulation(yearSimulate) {
    console.log(`Simulasi Garansi pada tahun ${yearSimulate} :`);
    this.cars.forEach((item, i) => {
      console.log(`
              ${i + 1}. Engine Number   : ${item.engineNumber}
                  Variant         : ${item.variant}
                  Tyre            : ${item.tyre.brand} with ${item.tyre.size} Inch
                  Door            : ${item.door}
                  Seat            : ${item.seat} seat
                  Year            : ${item.year}
                  warranty        : ${item.warranty} year
                  status Warranty : ${yearSimulate - item.year > item.warranty ? 'expired' : 'active'}
                <========================================================>
              `);
    });
  }
}

let Innova = new CarFactory();
Innova.produce(2021);
Innova.produce(2023);
Innova.result();
Innova.guaranteeSimulation(2025);