<?php
namespace Src\TableGateways;

class MapFeatureGateway
{
    private $db = null;

    public function __construct($db)
    {
        $this->db = $db;
    }

    public function getFeature($id)
    {
        $statement = "
            SELECT 
                Id, XCoord, YCoord, Description, FeatureTypeId
            FROM
                MapFeature
            WHERE
                Id = ?;
        ";

        try
        {
            $statement = $this->db->prepare($statement);
            $statement->execute(array($id));
            $result = $statement->fetchAll(\PDO::FETCH_ASSOC);
            return $result;
        }
        catch (\PDOException $e)
        {
            exit($e->getMessage());
        }
    }

    public function getAllFeatures()
    {
        $statement = "
            SELECT 
                Id, XCoord, YCoord, Description, FeatureTypeId
            FROM
                MapFeature;
        ";

        try
        {
            $statement = $this->db->query($statement);
            $result = $statement->fetchAll(\PDO::FETCH_ASSOC);
            return $result;
        }
        catch (\PDOException $e)
        {
            exit($e->getMessage());
        }
    }

    public function getFeaturesOfType($featureTypeId)
    {
        $statement = "
            SELECT 
                Id, XCoord, YCoord, Description, FeatureTypeId
            FROM
                MapFeature
            WHERE
                FeatureTypeId = ?;
        ";

        try
        {
            $statement = $this->db->prepare($statement);
            $statement->execute(array($featureTypeId));
            $result = $statement->fetchAll(\PDO::FETCH_ASSOC);
            return $result;
        }
        catch (\PDOException $e)
        {
            exit($e->getMessage());
        }
    }

    public function insert(array $input)
    {
        $statement = "
            INSERT INTO MapFeature 
                (XCoord, YCoord, Description, FeatureTypeId)
            VALUES
                (:XCoord, :YCoord, :Description, :FeatureTypeId);
        ";

        try
        {
            $statement = $this->db->prepare($statement);
            $statement->execute(array(
                'XCoord' => $input['XCoord'],
                'YCoord' => $input['YCoord'],
                'Description'  => $input['Description'],
                'FeatureTypeId' => $input['FeatureTypeId'] ?? 1,
            ));
            return $statement->rowCount();
        }
        catch (\PDOException $e)
        {
            exit($e->getMessage());
        }
    }

    public function delete($id)
    {
        $statement = "
            DELETE FROM MapFeature
            WHERE Id = ?;
        ";

        try
        {
            $statement = $this->db->prepare($statement);
            $statement->execute(array($id));
            return $statement->rowCount();
        }
        catch (\PDOException $e)
        {
            exit($e->getMessage());
        }
    }
}