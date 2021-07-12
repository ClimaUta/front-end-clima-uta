export class Clima{
    constructor(
        public ID: number,
        public AMBIENT_TEMPERATURE: number,
        public AIR_PRESSURE: number,
        public HUMIDITY: number,
        public CREATED: Date
    ){}
}