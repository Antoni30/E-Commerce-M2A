package com.db.VENTAS.Service;

import com.db.VENTAS.Models.DetallesVenta;

import java.util.List;
import java.util.Optional;

public interface DetallesVentaService {

    // Crear o actualizar un detalle de venta
    DetallesVenta save(DetallesVenta detallesVenta);

    // Obtener todos los detalles de venta
    List<DetallesVenta> findAll();

    // Obtener un detalle de venta por su ID
    Optional<DetallesVenta> findById(Integer idDetalleVenta);

    // Obtener detalles de venta por ID de venta
    List<DetallesVenta> findByDatosVentaIdVenta(Integer idVenta);

    // Obtener detalles de venta por ID de producto
    List<DetallesVenta> findByIdProductoFk(Integer idProductoFk);

    // Eliminar un detalle de venta por su ID
    void deleteById(Integer idDetalleVenta);
}
