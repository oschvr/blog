+++
title = "Cómo hacer un Proxy de Tor"
date = "2017-08-29"
description = "Guía para crear un proxy utilizando Tor."
slug = "como-hacer-un-proxy-de-tor"
draft = false
cover ='https://oschvr.s3.dualstack.us-west-2.amazonaws.com/b3b964aa766c45ffad3eb29a6cded081.png'
tags = ["tor", "proxy", "networking"]
categories = ["technology"]
+++

## [Descarga el PDF](https://oschvr.s3.dualstack.us-west-2.amazonaws.com/7edea024dade4920a9d361406ea09b73.pdf)

### Video

[![IMAGE ALT TEXT HERE](https://img.youtube.com/vi/Rl4kKxOOsgU/0.jpg)](https://www.youtube.com/watch?v=Rl4kKxOOsg)

![rpi](https://oschvr.s3.dualstack.us-west-2.amazonaws.com/3f7c3ea90e5345a48e2d68790f89c140.jpg)

### Requisitos

- Raspberry Pi (2 o 3)
- ISO de Raspbian Jessie (Debian) [Descargar](https://www.raspberrypi.org/downloads/raspbian/)
- Tarjeta SD > 8Gb (SDCard)
- Tarjeta Inalámbrica (Wifi Dongle)
- Conexión a Router por Ethernet
- Periféricos (Teclado, Mouse, Monitor, Cable HDMI)

## Iniciando

1. Flashear el ISO de Raspbian a la SDCard. Yo usé [ApplePi Baker](http://macappstore.org/applepi-baker/). Aquí hay un [excelente tutorial](https://computers.tutsplus.com/articles/how-to-flash-an-sd-card-for-raspberry-pi--mac-53600)
2. Conectar todos los periféricos (mouse, teclado, monitor) y el micro Usb
   para encender el Raspberry
3. Abrir una terminal y escribir `bashsudo raspi-config`
4. Ir a `'Interfacing Options' > 'SSH'` y habilitar el server de SSH y salir.
5. Escribir `ifconfig` y copiar la dirección IP que está a un lado de `inet` en la parte de `eth0`

![ssh](https://oschvr.s3.dualstack.us-west-2.amazonaws.com/e92e93d889f649b7a3e20c1efcced128.png)

## Tutorial

Primero que nada, establecemos la conexión a nuestro RaspberryPi por medio de _SSH_

Abrimos nuestra terminal y tecleamos:

```bash
ssh pi@<dirección IP que conseguimos en el paso anterior>
```

en mi caso es:

```bash
ssh pi@192.168.100.5
```

Y escribimos la contraseña, que por default es `raspberry`.

Actualizamos los paquetes

```bash
sudo apt-get update
```

#### HOSTAPD y ISC-DHCP-SERVER

Instalamos hostapd y isc-dhcp-server

```bash
sudo apt-get install hostapd isc-dhcp-server
```

Instalamos iptables-persistent

```bash
sudo apt-get install iptables-persistent
sudo nano /etc/dhcp/dhcpd.conf
```

Encontrar las lineas que dicen

```bash
option domain-name "example.org";
option domain-name-servers ns1.example.org, ns2.example.org;
```

Comentarlas (ponerles un # al principio)

```bash
 # option domain-name "example.org";
 # option domain-name-servers ns1.example.org, ns2.example.org;
```

Encontrar las lineas que dicen

```bash
 # If this DHCP server is the official DHCP server for the local
 # network, the authoritative directive should be uncommented.
 #  authoritative;
```

Y quitar el #

```bash
 # If this DHCP server is the official DHCP server for the local
 # network, the authoritative directive should be uncommented.
  authoritative;
```

Baja, agrega lo siguiente y guarda:

```bash
subnet 192.168.42.0 netmask 255.255.255.0 {
  range 192.168.42.10 192.168.42.50;
  option broadcast-address 192.168.42.255;
  option routers 192.168.42.1;
  default-lease-time 600;
  max-lease-time 7200;
  option domain-name "local";
  option domain-name-servers 8.8.8.8, 8.8.4.4;
}
```

```bash
sudo nano /etc/default/isc-dhcp-server
```

Baja a INTERFACES="" y actualiza a INTERFACES="wlan0"

```bash
sudo ifdown wlan0
sudo nano /etc/network/interfaces
```

Cambia manual por dhcp en iface eth0

Quita cualquier configuracion de wlan0, agrega lo siguiente y guarda:

```bash
auto lo

iface lo inet loopback
iface eth0 inet dhcp

allow-hotplug wlan0

iface wlan0 inet static
 address 192.168.42.1
 netmask 255.255.255.0

 #iface wlan0 inet manual
 #wpa-roam /etc/wpa_supplicant/wpa_supplicant.conf
 #iface default inet dhcp
```

Asignale la ip estatica a wlan0

```bash
sudo ifconfig wlan0 192.168.42.1
sudo nano /etc/hostapd/hostapd.conf
```

Copia y pega la siguiente configuración de hostapd, recuerda cambiar el `ssid` y el `wpa_passphrase`.

```bash
interface=wlan0
 #driver=rtl871xdrv
ssid=TORNet
country_code=US
hw_mode=g
channel=6
macaddr_acl=0
auth_algs=1
ignore_broadcast_ssid=0
wpa=2
wpa_passphrase=Raspberry
wpa_key_mgmt=WPA-PSK
wpa_pairwise=CCMP
wpa_group_rekey=86400
ieee80211n=1
wme_enabled=1
```

```bash
sudo nano /etc/default/hostapd
```

Encuentra #DAEMON_CONF="" para que diga DAEMON_CONF="/etc/hostapd/hostapd.conf"

```bash
sudo nano /etc/init.d/hostapd
```

Vuelve a hacer lo mismo en, DAEMON_CONF="" para que diga DAEMON_CONF="/etc/hostapd/hostapd.conf"

```bash
sudo nano /etc/sysctl.conf
```

Descomenta la linea: `net.ipv4.ip_forward=1`

Cambia las tablas de IP a lo siguiente:

```bash
sudo sh -c "echo 1 > /proc/sys/net/ipv4/ip_forward"
sudo iptables -t nat -A POSTROUTING -o eth0 -j MASQUERADE
sudo iptables -A FORWARD -i eth0 -o wlan0 -m state --state RELATED,ESTABLISHED -j ACCEPT
sudo iptables -A FORWARD -i wlan0 -o eth0 -j ACCEPT
sudo sh -c "iptables-save > /etc/iptables/rules.v4"
```

Levantamos para probar nuestro punto de acceso:

```bash
sudo /usr/sbin/hostapd /etc/hostapd/hostapd.conf
```

Deberíamos ver nuestro ssid en la lista de redes.

```bash
sudo mv /usr/share/dbus-1/system-services/fi.epitest.hostap.WPASupplicant.service ~/
```

Reiniciamos hostapd e isc-dhcp-server y con [update-rc.d](https://www.debuntu.org/how-to-managing-services-with-update-rc-d/) para iniciarlos al reiniciar el raspberry

```bash
sudo reboot
sudo /usr/sbin/hostapd /etc/hostapd/hostapd.conf
sudo service hostapd start
sudo service isc-dhcp-server start
sudo update-rc.d hostapd enable
sudo update-rc.d isc-dhcp-server enable
```

Revisamos si ambos estan arriba.

```bash
sudo service isc-dhcp-server status
sudo service hostapd status
```

![services](https://oschvr.s3.dualstack.us-west-2.amazonaws.com/5961c8cda66d460db4304e6fb3fd3650.png)

#### TOR

```bash
sudo apt-get update
sudo apt-get install tor
sudo nano /etc/tor/torrc
```

e inserta lo siguiente en alguna parte de arriba del archivo:

```bash
Log notice file /var/log/tor/notices.log
VirtualAddrNetwork 10.192.0.0/10
AutomapHostsSuffixes .onion,.exit
AutomapHostsOnResolve 1
TransPort 9040
TransListenAddress 192.168.42.1
DNSPort 53
DNSListenAddress 192.168.42.1
```

Cambia las tablas de IP para rutear hacia el puerto 9040 de TOR.

```bash
sudo iptables -F
sudo iptables -t nat -F
sudo iptables -t nat -A PREROUTING -i wlan0 -p tcp --dport 22 -j REDIRECT --to-ports 22
sudo iptables -t nat -A PREROUTING -i wlan0 -p udp --dport 53 -j REDIRECT --to-ports 53
sudo iptables -t nat -A PREROUTING -i wlan0 -p tcp --syn -j REDIRECT --to-ports 9040
sudo iptables -t nat -L
sudo sh -c "iptables-save > /etc/iptables.ipv4.nat"
```

Reconfiguramos iptables-persistent para usar las reglas actuales

```bash
sudo dpkg-reconfigure iptables-persistent
```

Creamos los logs de tor y les cambiamos el _owner_ y el _mode_

```bash
sudo touch /var/log/tor/notices.log
sudo chown debian-tor /var/log/tor/notices.log
sudo chmod 644 /var/log/tor/notices.log
ls -l /var/log/tor
```

Iniciamos el servicio de tor y lo hacemos automático al inico del RPi.

```bash
sudo service tor start
sudo service tor status
sudo update-rc.d tor enable
```

#### Prueba

![ssid](https://oschvr.s3.dualstack.us-west-2.amazonaws.com/1111796eca8a4a0591e01b612cc5c16a.png)

Nos conectamos a la red desde otra computadora o teléfono para probar, y visitamos [https://check.torproject.org/](https://check.torproject.org/) para comprobar conexión a internet y que en efecto nuestro tráfico esta siendo routeado por Tor.

--

[¿Qué es y cómo usar Tor?](https://www.youtube.com/watch?v=wlP1JrfvUo0&t=45s)

![hexagons](https://oschvr.s3.dualstack.us-west-2.amazonaws.com/2e5e0996f7dc4ec180e9b0746e9221d1.png)
