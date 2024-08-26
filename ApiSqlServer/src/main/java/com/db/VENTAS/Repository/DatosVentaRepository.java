package com.db.VENTAS.Repository;

import com.db.VENTAS.Models.DatosVenta;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Repository
public interface DatosVentaRepository extends JpaRepository<DatosVenta, Integer> {

    // Método para encontrar una venta por su código de venta
    Optional<DatosVenta> findByCodigoVenta(String codigoVenta);

    // Método para encontrar una venta por ID_VENTA
    Optional<DatosVenta> findById(Integer idVenta);

    // Método para eliminar una venta por ID_VENTA
    void deleteById(Integer idVenta);

    List<DatosVenta> findByFecha(Date fecha);
}
