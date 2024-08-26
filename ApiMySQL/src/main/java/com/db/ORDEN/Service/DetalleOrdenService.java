package com.db.ORDEN.Service;

import com.db.ORDEN.Models.DetalleOrden;
import java.util.List;

public interface DetalleOrdenService {

    DetalleOrden saveDetalleOrden(DetalleOrden detalleOrden);

    DetalleOrden getDetalleOrdenById(Integer id);

    List<DetalleOrden> getAllDetalleOrden();

    void deleteDetalleOrden(Integer id);
}
