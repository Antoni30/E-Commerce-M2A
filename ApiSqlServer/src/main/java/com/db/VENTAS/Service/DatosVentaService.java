package com.db.VENTAS.Service;

import com.db.VENTAS.Models.DatosVenta;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;
@Service
public interface DatosVentaService {

    // Crear o actualizar una venta
    DatosVenta save(DatosVenta datosVenta);

    // Obtener una venta por ID_VENTA
    Optional<DatosVenta> findById(Integer idVenta);

    // Obtener una venta por código de venta
    Optional<DatosVenta> findByCodigoVenta(String codigoVenta);

    // Obtener todas las ventas
    List<DatosVenta> findAll();

    // Eliminar una venta por ID_VENTA
    void deleteById(Integer idVenta);

    // Obtener todas las ventas por una fecha específica
    List<DatosVenta> findByFecha(Date fecha);
}
