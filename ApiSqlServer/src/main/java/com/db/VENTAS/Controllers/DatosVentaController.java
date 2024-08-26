package com.db.VENTAS.Controllers;

import com.db.VENTAS.Models.DatosVenta;
import com.db.VENTAS.Service.DatosVentaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = {"http://localhost:8381"})
@RequestMapping("/api/datosventa")
public class DatosVentaController {

    private final DatosVentaService datosVentaService;

    @Autowired
    public DatosVentaController(DatosVentaService datosVentaService) {
        this.datosVentaService = datosVentaService;
    }

    // Crear una nueva venta
    @PostMapping
    public ResponseEntity<DatosVenta> createVenta(@RequestBody DatosVenta datosVenta) {
        DatosVenta savedVenta = datosVentaService.save(datosVenta);
        return new ResponseEntity<>(savedVenta, HttpStatus.CREATED);
    }

    // Obtener todos los datos de ventas
    @GetMapping
    public ResponseEntity<List<DatosVenta>> getAllVentas() {
        List<DatosVenta> ventas = datosVentaService.findAll();
        return new ResponseEntity<>(ventas, HttpStatus.OK);
    }

    // Obtener una venta por ID_VENTA
    @GetMapping("/{idVenta}")
    public ResponseEntity<DatosVenta> getVentaById(@PathVariable Integer idVenta) {
        Optional<DatosVenta> venta = datosVentaService.findById(idVenta);
        return venta.map(ResponseEntity::ok)
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    // Obtener una venta por CODIGO_VENTA
    @GetMapping("/codigo/{codigoVenta}")
    public ResponseEntity<DatosVenta> getVentaByCodigoVenta(@PathVariable String codigoVenta) {
        Optional<DatosVenta> venta = datosVentaService.findByCodigoVenta(codigoVenta);
        return venta.map(ResponseEntity::ok)
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    // Actualizar una venta existente
    @PutMapping("/{idVenta}")
    public ResponseEntity<DatosVenta> updateVenta(@PathVariable Integer idVenta, @RequestBody DatosVenta datosVenta) {
        Optional<DatosVenta> existingVenta = datosVentaService.findById(idVenta);
        if (existingVenta.isPresent()) {
            datosVenta.setIdVenta(idVenta);
            DatosVenta updatedVenta = datosVentaService.save(datosVenta);
            return new ResponseEntity<>(updatedVenta, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // Eliminar una venta por ID_VENTA
    @DeleteMapping("/{idVenta}")
    public ResponseEntity<Void> deleteVenta(@PathVariable Integer idVenta) {
        Optional<DatosVenta> existingVenta = datosVentaService.findById(idVenta);
        if (existingVenta.isPresent()) {
            datosVentaService.deleteById(idVenta);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
