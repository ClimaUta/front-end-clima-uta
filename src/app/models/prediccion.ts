export class Prediccion{
    constructor(
        public AMBIENT_TEMPERATURE: number,
        public AIR_PRESSURE: number,
        public HUMIDITY: number,
        public id: number,
        public utc: string
    ){}
}