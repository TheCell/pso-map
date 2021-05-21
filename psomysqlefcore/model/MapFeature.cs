using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace psomysqlefcore.model
{
    public class MapFeature
    {
        [Key]
        public long Id { get; set; }

        public float xCoord { get; set; }

        public float yCoord { get; set; }

        public string? description { get; set; }

        [ForeignKey(nameof(FeatureType))]
        public long FeatureTypeId { get; set; }

        public virtual FeatureType FeatureType { get; set; }
    }
}
