'use'

import React, { useEffect, useState } from 'react';

interface Compra {
  fecha: string;
  producto: string;
  precio: number;
  proveedor: string;
}

const ReporteDePerdidas = () => {

  const convertDate = (date: Date) => {
    const mongoDate = new Date(date)
    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    }
    return mongoDate.toLocaleDateString('es-ES', options)
}

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 md:p-8">
      <h1 className="text-3xl font-bold mb-4">Reporte de Perdidas</h1>
     
    </div>
  );
};

export default ReporteDePerdidas;