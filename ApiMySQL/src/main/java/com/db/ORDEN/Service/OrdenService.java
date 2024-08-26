package com.db.ORDEN.Service;

import com.db.ORDEN.Models.Orden;
import java.util.List;
import java.util.Optional;

public interface OrdenService {

    // Obtener todas las órdenes
    List<Orden> getAllOrdenes();

    // Obtener una orden por su ID
    Optional<Orden> getOrdenById(Integer id);

    // Crear o actualizar una orden
    Orden saveOrUpdateOrden(Orden orden);

    // Eliminar una orden por su ID
    void deleteOrdenById(Integer id);
}
