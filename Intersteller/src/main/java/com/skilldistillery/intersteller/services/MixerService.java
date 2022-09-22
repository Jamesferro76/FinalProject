package com.skilldistillery.intersteller.services;

import java.util.List;

import com.skilldistillery.intersteller.entities.Mixer;

public interface MixerService {
    public List<Mixer> index(String username);

    public Mixer findById(String username, int mid);

    public Mixer create(String username, Mixer mixer);

    public Mixer update(String username, int mid, Mixer mixer);

    public boolean destroy(String username, int mid);

}
