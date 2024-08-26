package com.db.ORDEN.Controllers;

import com.db.ORDEN.Models.DetalleOrden;
import com.db.ORDEN.Service.DetalleOrdenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = {"http://localhost:8081"})
@RequestMapping("/api/detalleorden")
public class DetalleOrdenController {

    private final DetalleOrdenService detalleOrdenService;

    @Autowired
    public DetalleOrdenController(DetalleOrdenService detalleOrdenService) {
        this.detalleOrdenService = detalleOrdenService;
    }

    @PostMapping
    public ResponseEntity<DetalleOrden> createDetalleOrden(@RequestBody DetalleOrden detalleOrden) {
        DetalleOrden savedDetalleOrden = detalleOrdenService.saveDetalleOrden(detalleOrden);
        return ResponseEntity.ok(savedDetalleOrden);
    }

    @GetMapping("/{id}")
    public ResponseEntity<DetalleOrden> getDetalleOrdenById(@PathVariable Integer id) {
        DetalleOrden detalleOrden = detalleOrdenService.getDetalleOrdenById(id);
        if (detalleOrden != null) {
            return ResponseEntity.ok(detalleOrden);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping
    public ResponseEntity<List<DetalleOrden>> getAllDetalleOrden() {
        List<DetalleOrden> detalleOrdenList = detalleOrdenService.getAllDetalleOrden();
        return ResponseEntity.ok(detalleOrdenList);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDetalleOrden(@PathVariable Integer id) {
        DetalleOrden detalleOrden = detalleOrdenService.getDetalleOrdenById(id);
        if (detalleOrden != null) {
            detalleOrdenService.deleteDetalleOrden(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
