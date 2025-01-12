<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:xs="http://www.w3.org/2001/XMLSchema"
    xmlns:tei="http://www.tei-c.org/ns/1.0"
    exclude-result-prefixes="xs tei"
    version="2.0">
    
    <xsl:output method="html" indent="yes" encoding="UTF-8"/>

    <!-- Root Template -->
    <xsl:template match="tei:TEI">
        <div class="row align-items-start mb-4">
            <!-- About the Manuscript Section -->
            <div class="col-md-6">
                <h4>About the Manuscript Page:</h4>
                <div class="card">
                    <div class="card-body">
                        <p><xsl:value-of select="//tei:sourceDesc"/></p>
                        <p><small><xsl:value-of select="//tei:licence"/></small></p>
                    </div>
                </div>
            </div>

            <!-- Statistics Section -->
            <div class="col-md-6">
                <h4>Statistics</h4>
                <div class="stat-container">
                    <ul class="list-group">
                        <li class="list-group-item">
                            <strong>Total Modifications: </strong>
                            <xsl:value-of select="count(//tei:del | //tei:add)"/>
                        </li>
                        <li class="list-group-item">
                            <strong>Total Additions: </strong>
                            <xsl:value-of select="count(//tei:add)"/>
                        </li>
                        <li class="list-group-item">
                            <strong>Total Deletions: </strong>
                            <xsl:value-of select="count(//tei:del)"/>
                        </li>
                        <li class="list-group-item">
                            <strong>Percy Shelley Corrections (#PBS): </strong>
                            <xsl:value-of select="count(//tei:add[@hand='#PBS'] | //tei:del[@hand='#PBS'])"/>
                        </li>
                        <li class="list-group-item">
                            <strong>Mary Shelley Corrections (#MWS): </strong>
                            <xsl:value-of select="count(//tei:add[@hand='#MWS'] | //tei:del[@hand='#MWS'])"/>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </xsl:template>
</xsl:stylesheet>
