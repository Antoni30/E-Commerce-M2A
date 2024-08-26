package com.db.VENTAS.Controllers;

import com.db.VENTAS.Models.DetallesVenta;
import com.db.VENTAS.Service.DetallesVentaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = {"http://localhost:8381"})
@RequestMapping("/api/detallesventa")
public class DetallesVentaController {

    private final DetallesVentaService detallesVentaService;

    @Autowired
    public DetallesVentaController(DetallesVentaService detallesVentaService) {
        this.detallesVentaService = detallesVentaService;
    }

    // Crear un nuevo detalle de venta
    @PostMapping
    public ResponseEntity<DetallesVenta> createDetalleVenta(@RequestBody DetallesVenta detallesVenta) {
        DetallesVenta savedDetalleVenta = detallesVentaService.save(detallesVenta);
        return new ResponseEntity<>(savedDetalleVenta, HttpStatus.CREATED);
    }

    // Obtener todos los detalles de ventas
    @GetMapping
    public ResponseEntity<List<DetallesVenta>> getAllDetallesVentas() {
        List<DetallesVenta> detallesVentas = detallesVentaService.findAll();
        return new ResponseEntity<>(detallesVentas, HttpStatus.OK);
    }

    // Obtener un detalle de venta por ID_DETALLE_VENTA
    @GetMapping("/{idDetalleVenta}")
    public ResponseEntity<DetallesVenta> getDetalleVentaById(@PathVariable Integer idDetalleVenta) {
        Optional<DetallesVenta> detalleVenta = detallesVentaService.findById(idDetalleVenta);
        return detalleVenta.map(ResponseEntity::ok)
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    // Actualizar un detalle de venta existente
    @PutMapping("/{idDetalleVenta}")
    public ResponseEntity<DetallesVenta> updateDetalleVenta(@PathVariable Integer idDetalleVenta, @RequestBody DetallesVenta detallesVenta) {
        Optional<DetallesVenta> existingDetalleVenta = detallesVentaService.findById(idDetalleVenta);
        if (existingDetalleVenta.isPresent()) {
            detallesVenta.setIdDetalleVenta(idDetalleVenta);
            DetallesVenta updatedDetalleVenta = detallesVentaService.save(detallesVenta);
            return new ResponseEntity<>(updatedDetalleVenta, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // Eliminar un detalle de venta por ID_DETALLE_VENTA
    @DeleteMapping("/{idDetalleVenta}")
    public ResponseEntity<Void> deleteDetalleVenta(@PathVariable Integer idDetalleVenta) {
        Optional<DetallesVenta> existingDetalleVenta = detallesVentaService.findById(idDetalleVenta);
        if (existingDetalleVenta.isPresent()) {
            detallesVentaService.deleteById(idDetalleVenta);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
