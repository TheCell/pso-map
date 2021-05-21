using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace psomysqlefcore.model
{
    public class FeatureType
    {
        [Key]
        public long Id { get; set; }

        public string? Name { get; set; }

        public virtual ICollection<MapFeature> MapFeatures { get; set; }
    }
}
