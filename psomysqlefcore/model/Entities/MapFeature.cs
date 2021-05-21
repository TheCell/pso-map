using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace psomysqlefcore.model.Entities
{
    public class MapFeature
    {
        [Key]
        public long Id { get; set; }

        public float XCoord { get; set; }

        public float YCoord { get; set; }

        public string? Description { get; set; }

        [ForeignKey(nameof(FeatureType))]
        public long FeatureTypeId { get; set; }

        public virtual FeatureType FeatureType { get; set; }
    }
}
