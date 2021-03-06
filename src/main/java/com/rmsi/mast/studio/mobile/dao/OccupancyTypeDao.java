/**
 * 
 */
package com.rmsi.mast.studio.mobile.dao;

import com.rmsi.mast.studio.dao.GenericDAO;
import com.rmsi.mast.studio.domain.OccupancyType;

/**
 * @author Shruti.Thakur
 *
 */
public interface OccupancyTypeDao extends GenericDAO<OccupancyType, Integer> {

	OccupancyType getOccupancyTypeById(int occId);

}
