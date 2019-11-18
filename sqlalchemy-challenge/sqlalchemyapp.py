import numpy as np

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func

from flask import Flask, jsonify

engine = create_engine("sqlite:///titanic.sqlite")


Base = automap_base()

Base.prepare(engine, reflect=True)

Passenger = Base.classes.passenger

Measurement = Base.classes.measurement
Station = Base.classes.station
session = Session(engine)

app = Flask(__name__)

@app.route("/")
def welcome():
    """List all available api routes."""
    return (
        f"Available Routes:<br/>"
        f"/api/v1.0/precipitation"
        f"/api/v1.0/stations"
        f"/api/v1.0/tobs"
        f"/api/v1.0/<start>"
        f"/api/v1.0/<start>/<end>"
    )
# Convert the query results to a Dictionary using `date` as the key and `prcp` as the value.
# Return the JSON representation of your dictionary.
@app.route("/api/v1.0/precipitation")
def precipitation():
    previous_year_date= dt.date(2017,8,23) - dt.timedelta(days=365)
    results = session.query(Measurement.date, Measurement.prcp).\filter(Measurement.date >= previous_year_date).\
    order_by(Measurement.date).all()
    all_preciptation = []
    for precipitation in precipations:
        precipitation_dict = {}
        precipitation_dict["date"] = precipitation.date
        precipitation_dict["prcp"] = precipitation.prcp
        all_precipitation.append(precipitation_dict)
    return jsonify(all_precipitation)

# Return a JSON list of stations from the dataset.
@app.route("/api/v1.0/stations")
def stations:
     all_stations = session.query(Station.name,Station.station).all()
        station_data = []
        for station in all_stations:
            station_dict = {}
            station_dict["Station"] = station.station
            station_dict["Name"] = station.name
            station_data.append(station_dict)

    return jsonify(station_data)   

# query for the dates and temperature observations from a year from the last data point.
# Return a JSON list of Temperature Observations (tobs) for the previous year.
@app.route("/api/v1.0/tobs")
def temp_monthly():
    """Return the temperature observations (tobs) for previous year."""
    
    previous_year_date = dt.date(2017, 8, 23) - dt.timedelta(days=365)

   
    results = session.query(Measurement.tobs).\filter(Measurement.station == 'USC00519281').\filter(Measurement.date >= previous_year_date).all()

    # Unravel results into a 1D array and convert to a list
    temps = list(np.ravel(results))

    # Return the results
    return jsonify(temps)


@app.route("/api/v1.0/temp/<start>")
@app.route("/api/v1.0/temp/<start>/<end>")
def stats(start=None, end=None):
    """Return TMIN, TAVG, TMAX."""

    # Select statement
    sel = [func.min(Measurement.tobs), func.avg(Measurement.tobs), func.max(Measurement.tobs)]

    if not end:
        # calculate TMIN, TAVG, TMAX for dates greater than start
        results = session.query(*sel).\
            filter(Measurement.date >= start).all()
        # Unravel results into a 1D array and convert to a list
        temps = list(np.ravel(results))
        return jsonify(temps)

    # calculate TMIN, TAVG, TMAX with start and stop
    results = session.query(*sel).\
        filter(Measurement.date >= start).\
        filter(Measurement.date <= end).all()
    # Unravel results into a 1D array and convert to a list
    temps = list(np.ravel(results))
    return jsonify(temps)


if __name__ == '__main__':
    app.run(debug=True)

