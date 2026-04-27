class Timer {
  constructor(nome) {
    this.nome = nome;
    this.segundos = 0;
  }

  iniciar() {
    setInterval(() => {
      this.segundos++;
      console.log(`${this.nome}: ${this.segundos}s`);
    }, 1000);
  }
}

const t = new Timer("Cronômetro");
t.iniciar();

//Qual era o erro:
//O erro era que a função setInterval estava usando uma função tradicional, o que fazia com que o valor de "this" dentro da função não se referisse ao objeto Timer.
//O que muda no comportamento do código:
//Ao usar uma função de seta (arrow function) dentro do setInterval, o valor de "this" é preservado e se refere ao objeto Timer, permitindo que a propriedade "segundos" seja incrementada corretamente e exibida no console.