function calculateFee(vehicleType, entryTime, exitTime) {
    const milisegundos = exitTime - entryTime;
    const minutos = Math.ceil(milisegundos / 60000);

    if (vehicleType === 'OFICIAL') return 0;
    if (vehicleType === 'RESIDENTE') return minutos * 1;
    if (vehicleType === 'NO_RESIDENTE') return minutos * 3;

    return 0;
}

export default calculateFee;

