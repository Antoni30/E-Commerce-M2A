package com.db.ORDEN.Controllers;

import com.db.ORDEN.Models.Orden;
import com.db.ORDEN.Service.OrdenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = {"http://localhost:8081"})
@RequestMapping("/ordenes")
public class OrdenController {

    @Autowired
    private OrdenService ordenService;

    // Obtener todas las órdenes
    @GetMapping
    public ResponseEntity<List<Orden>> getAllOrdenes() {
        List<Orden> ordenes = ordenService.getAllOrdenes();
        return new ResponseEntity<>(ordenes, HttpStatus.OK);
    }

    // Obtener una orden por ID
    @GetMapping("/{id}")
    public ResponseEntity<Orden> getOrdenById(@PathVariable Integer id) {
        Optional<Orden> orden = ordenService.getOrdenById(id);
        return orden.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    // Crear una nueva orden
    @PostMapping
    public ResponseEntity<Orden> createOrden(@RequestBody Orden orden) {
        Orden savedOrden = ordenService.saveOrUpdateOrden(orden);
        return new ResponseEntity<>(savedOrden, HttpStatus.CREATED);
    }

    // Actualizar una orden existente
    @PutMapping("/{id}")
    public ResponseEntity<Orden> updateOrden(@PathVariable Integer id, @RequestBody Orden orden) {
        if (!ordenService.getOrdenById(id).isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        orden.setIdOrden(id);
        Orden updatedOrden = ordenService.saveOrUpdateOrden(orden);
        return new ResponseEntity<>(updatedOrden, HttpStatus.OK);
    }

    // Eliminar una orden por ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteOrden(@PathVariable Integer id) {
        if (!ordenService.getOrdenById(id).isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        ordenService.deleteOrdenById(id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }
}
