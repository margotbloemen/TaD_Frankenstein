<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
                xmlns:tei="http://www.tei-c.org/ns/1.0"
                version="2.0">

    <!-- Ignore teiHeader -->
    <xsl:template match="tei:teiHeader"/>

    <!-- Root structure -->
    <xsl:template match="tei:body">
        <div class="transcription-container">
            <!-- Left margin notes -->
            <div class="marginAdd left">
                <xsl:apply-templates select="//tei:add[@place='marginleft']"/>
            </div>
            
            <!-- Transcription text -->
            <div class="transcription">
                <xsl:apply-templates select="//tei:div"/>
            </div>
        </div>
    </xsl:template>

    <!-- Handle div -->
    <xsl:template match="tei:div">
        <div class="teiDiv">
            <xsl:apply-templates/>
        </div>
    </xsl:template>

    <!-- Handle paragraphs -->
    <xsl:template match="tei:p">
        <p>
            <xsl:apply-templates select="node()[not(self::tei:add[@place='marginleft'] or self::tei:add[@place='marginright'])]"/>
        </p>
    </xsl:template>

    <!-- Handle line breaks -->
    <xsl:template match="tei:lb">
        <br id="{generate-id()}"/>
    </xsl:template>

    <!-- Handle superscript text -->
    <xsl:template match="tei:hi[@rend='sup']">
        <sup>
            <xsl:apply-templates/>
        </sup>
    </xsl:template>

    <!-- Handle underlined text -->
    <xsl:template match="tei:hi[@rend='u']">
        <u>
            <xsl:apply-templates/>
        </u>
    </xsl:template>

    <!-- Handle circled page numbers -->
    <xsl:template match="tei:num[@rend='circled']">
        <span class="circledPage">
            <xsl:apply-templates/>
        </span>
    </xsl:template>

    <!-- Handle marginleft additions with Mary or Percy class -->
    <xsl:template match="tei:add[@place='marginleft' and @hand='#MWS']">
        <div class="marginAdd left MWS" data-target-id="{generate-id(preceding-sibling::tei:lb[1] | preceding-sibling::tei:p[1])}">
            <xsl:apply-templates/>
        </div>
    </xsl:template>

    <xsl:template match="tei:add[@place='marginleft' and @hand='#PBS']">
        <div class="marginAdd left PBS" data-target-id="{generate-id(preceding-sibling::tei:lb[1] | preceding-sibling::tei:p[1])}">
            <xsl:apply-templates/>
        </div>
    </xsl:template>

    <!-- Handle general additions -->
    <xsl:template match="tei:add[@hand='#MWS']">
        <span class="MWS">
            <xsl:apply-templates/>
        </span>
    </xsl:template>

    <xsl:template match="tei:add[@hand='#PBS']">
        <span class="PBS">
            <xsl:apply-templates/>
        </span>
    </xsl:template>

    <!-- Handle deletions with specific hands -->
    <xsl:template match="tei:del[@hand='#MWS']">
        <del class="MWS">
            <xsl:apply-templates/>
        </del>
    </xsl:template>

    <xsl:template match="tei:del[@hand='#PBS']">
        <del class="PBS">
            <xsl:apply-templates/>
        </del>
    </xsl:template>



    <!-- Handle metamark for page numbers -->
<xsl:template match="tei:metamark[@function='pagenumber']">
    <div class="pagenumber">
        <xsl:apply-templates select="tei:num"/>
    </div>
</xsl:template>

<!-- Handle circled page numbers -->
<xsl:template match="tei:hi[@rend='circled']">
    <span class="circledPage">
        <xsl:apply-templates/>
    </span>
</xsl:template>

<!-- Handle notes and metamark -->

<xsl:template match="tei:note">
    <span class="editor-note">
        <strong>Note:</strong> <xsl:value-of select="."/>
    </span>
</xsl:template>

<xsl:template match="tei:metamark">
    <span class="metamark">
        <xsl:attribute name="data-function">
            <xsl:value-of select="@function"/>
        </xsl:attribute>
        <xsl:apply-templates/>
    </span>
</xsl:template>



</xsl:stylesheet>
