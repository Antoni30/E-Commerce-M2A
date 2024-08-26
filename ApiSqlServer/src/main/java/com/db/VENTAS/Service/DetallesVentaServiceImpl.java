package com.db.VENTAS.Service;

import com.db.VENTAS.Models.DetallesVenta;
import com.db.VENTAS.Repository.DetallesVentaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DetallesVentaServiceImpl implements DetallesVentaService {

    private final DetallesVentaRepository detallesVentaRepository;

    @Autowired
    public DetallesVentaServiceImpl(DetallesVentaRepository detallesVentaRepository) {
        this.detallesVentaRepository = detallesVentaRepository;
    }

    @Override
    public DetallesVenta save(DetallesVenta detallesVenta) {
        return detallesVentaRepository.save(detallesVenta);
    }

    @Override
    public List<DetallesVenta> findAll() {
        return detallesVentaRepository.findAll();
    }

    @Override
    public Optional<DetallesVenta> findById(Integer idDetalleVenta) {
        return detallesVentaRepository.findById(idDetalleVenta);
    }

    @Override
    public List<DetallesVenta> findByDatosVentaIdVenta(Integer idVenta) {
        return detallesVentaRepository.findByDatosVenta_IdVenta(idVenta);
    }

    @Override
    public List<DetallesVenta> findByIdProductoFk(Integer idProductoFk) {
        return detallesVentaRepository.findByIdProductoFk(idProductoFk);
    }

    @Override
    public void deleteById(Integer idDetalleVenta) {
        detallesVentaRepository.deleteById(idDetalleVenta);
    }
}
