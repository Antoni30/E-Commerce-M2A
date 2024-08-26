package com.db.VENTAS.Repository;

import com.db.VENTAS.Models.DetallesVenta;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DetallesVentaRepository extends JpaRepository<DetallesVenta, Integer> {

    // Puedes añadir consultas personalizadas si es necesario

    // Ejemplo de consulta personalizada para obtener detalles de venta por ID de venta
    List<DetallesVenta> findByDatosVenta_IdVenta(Integer idVenta);

    // Ejemplo de consulta personalizada para obtener detalles de venta por ID de producto
    List<DetallesVenta> findByIdProductoFk(Integer idProductoFk);

    // Otros métodos personalizados según sea necesario
}
