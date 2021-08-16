export class Prediccion{
    constructor(
        public AMBIENT_TEMPERATURE: number,
        public AIR_PRESSURE: number,
        public HUMIDITY: number,
        public hour: number,
        public day: number,
        public month: number,
        public id: number,
        public utc: string
    ){}
}