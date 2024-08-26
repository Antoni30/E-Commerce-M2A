package com.db.VENTAS.Service;

import com.db.VENTAS.Models.DatosVenta;
import com.db.VENTAS.Repository.DatosVentaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class DatosVentaServiceImpl implements DatosVentaService {

    private final DatosVentaRepository datosVentaRepository;

    @Autowired
    public DatosVentaServiceImpl(DatosVentaRepository datosVentaRepository) {
        this.datosVentaRepository = datosVentaRepository;
    }

    @Override
    public DatosVenta save(DatosVenta datosVenta) {
        return datosVentaRepository.save(datosVenta);
    }

    @Override
    public Optional<DatosVenta> findById(Integer idVenta) {
        return datosVentaRepository.findById(idVenta);
    }

    @Override
    public Optional<DatosVenta> findByCodigoVenta(String codigoVenta) {
        return datosVentaRepository.findByCodigoVenta(codigoVenta);
    }

    @Override
    public List<DatosVenta> findAll() {
        return datosVentaRepository.findAll();
    }

    @Override
    public void deleteById(Integer idVenta) {
        datosVentaRepository.deleteById(idVenta);
    }

    @Override
    public List<DatosVenta> findByFecha(Date fecha) {
        // Suponiendo que se ha agregado un método en el repositorio para encontrar por fecha
        return datosVentaRepository.findByFecha(fecha);
    }

}
